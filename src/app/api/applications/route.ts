import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { applications } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const position = formData.get('position') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const experience = formData.get('experience') as string;
    const availability = formData.get('availability') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const reference = formData.get('reference') as string;
    const cvFile = formData.get('cv') as File | null;

    let cvPath = null;

    // Handle CV file upload if present
    if (cvFile) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'cvs');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = cvFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}-${sanitizedName}`;
      const filepath = join(uploadsDir, filename);

      // Save file
      await writeFile(filepath, buffer);
      cvPath = `/uploads/cvs/${filename}`;
    }

    // Insert into database
    const [application] = await db.insert(applications).values({
      position,
      firstName,
      lastName,
      email,
      phone,
      experience,
      availability,
      coverLetter,
      referenceSource: reference,
      cvPath,
      status: 'pending',
    }).returning();

    // Send confirmation email to applicant
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Application Received - The Hawthorn',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ea580c;">Thank You for Your Application!</h2>
              <p>Dear ${firstName} ${lastName},</p>
              <p>We've successfully received your application for the <strong>${position}</strong> position at The Hawthorn.</p>
              
              <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #ea580c; margin-top: 0;">Application Summary:</h3>
                <ul style="line-height: 1.8;">
                  <li><strong>Position:</strong> ${position}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phone}</li>
                  <li><strong>Experience:</strong> ${experience} years</li>
                  <li><strong>Availability:</strong> ${availability}</li>
                </ul>
              </div>
              
              <h3 style="color: #ea580c;">What Happens Next?</h3>
              <ol style="line-height: 1.8;">
                <li>We'll review your application within 3-5 business days</li>
                <li>If you're a good fit, we'll reach out to schedule an interview</li>
                <li>Check your email regularly for updates</li>
              </ol>
              
              <p style="margin-top: 30px;">Thank you for your interest in joining The Hawthorn family!</p>
              
              <p style="color: #666; font-size: 14px; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
                Best regards,<br>
                <strong>The Hawthorn Team</strong>
              </p>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the application if email fails
    }

    console.log('Application submitted successfully');
    return NextResponse.json({
      success: true,
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allApplications = await db.select().from(applications).orderBy(desc(applications.createdAt));
    
    console.log('Fetched applications:', allApplications.length);
    
    return NextResponse.json({
      success: true,
      applications: allApplications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

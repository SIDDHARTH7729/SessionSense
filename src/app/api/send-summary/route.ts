import { Resend } from 'resend';
import SessionSummaryEmail from '@/components/SessionSummaryEmail';
import { getFocusedIntervals } from '@/lib/utils/trackUtils';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const {
    email,
    username,
    userId,
    videoId,
    pauses,
    forwards,
    rewinds,
  } = await req.json();

  // Get all focus intervals
  const focusedIntervals = await getFocusedIntervals(userId, videoId);

  // Calculate time watched in minutes
  const timeWatched = Math.floor(
    focusedIntervals.reduce((sum, interval) => sum + (interval.to - interval.from), 0) / 60
  );

  // Now include focusedIntervals in props
  const data = await resend.emails.send({
    from: 'StudeyTime studyTime.com',
    to: [email],
    subject: '📊 Your Video Session Summary',
    react: SessionSummaryEmail({
      username,
      timeWatched,
      pauses,
      forwards,
      rewinds,
      focusedIntervals, // ✅ ADD THIS
    }),
  });

  return Response.json({ success: true, data });
}


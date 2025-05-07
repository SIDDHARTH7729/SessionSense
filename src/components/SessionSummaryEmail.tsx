import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Heading,
  } from "@react-email/components";
  
  interface Props {
    username: string;
    timeWatched: number;
    pauses: number;
    forwards: number;
    rewinds: number;
    focusedIntervals: { from: number; to: number }[];
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  
  export default function SessionSummaryEmail({
    username,
    timeWatched,
    pauses,
    forwards,
    rewinds,
    focusedIntervals,
  }: Props) {
    return (
      <Html>
        <Head />
        <Preview>Your Video Session Summary</Preview>
        <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
          <Container style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "12px" }}>
            <Heading as="h2" style={{ color: "#333", marginBottom: "16px" }}>
              Hey {username}, here's your focus summary!
            </Heading>
  
            <Section style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
              <Text>🎬 <strong>Watch Time:</strong> {timeWatched} minutes</Text>
              <Text>⏸️ <strong>Pauses:</strong> {pauses}</Text>
              <Text>⏩ <strong>Forwards:</strong> {forwards}</Text>
              <Text>⏪ <strong>Rewinds:</strong> {rewinds}</Text>
  
              <Text style={{ marginTop: "16px" }}><strong>🧠 Focused Intervals:</strong></Text>
              {focusedIntervals.length > 0 ? (
                focusedIntervals.map(({ from, to }, idx) => (
                  <Text key={idx}>• {formatTime(from)} → {formatTime(to)}</Text>
                ))
              ) : (
                <Text>No uninterrupted focus intervals recorded.</Text>
              )}
            </Section>
  
            <Text style={{ marginTop: "32px", fontSize: "14px", color: "#888" }}>
              Keep tracking your attention and stay consistent!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
// import {
//     Html,
//     Head,
//     Preview,
//     Body,
//     Container,
//     Section,
//     Text,
//     Heading,
//   } from "@react-email/components";
  
//   interface Props {
//     username: string;
//     timeWatched: number;
//     pauses: number;
//     forwards: number;
//     rewinds: number;
//   }
  
//   export default function SessionSummaryEmail({
//     username,
//     timeWatched,
//     pauses,
//     forwards,
//     rewinds,
//   }: Props) {
//     return (
//       <Html>
//         <Head />
//         <Preview>Your Video Session Summary</Preview>
//         <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
//           <Container style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "12px" }}>
//             <Heading as="h2" style={{ color: "#333", marginBottom: "16px" }}>
//               Hey {username}, here's what you did!
//             </Heading>
  
//             <Section style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}>
//               <Text>🎬 <strong>Watch Time:</strong> {timeWatched} minutes</Text>
//               <Text>⏸️ <strong>Pauses:</strong> {pauses}</Text>
//               <Text>⏩ <strong>Forwards:</strong> {forwards}</Text>
//               <Text>⏪ <strong>Rewinds:</strong> {rewinds}</Text>
//             </Section>
  
//             <Text style={{ marginTop: "32px", fontSize: "14px", color: "#888" }}>
//               Want to improve next time? Track your focus and stay consistent!
//             </Text>
//           </Container>
//         </Body>
//       </Html>
//     );
//   }
  
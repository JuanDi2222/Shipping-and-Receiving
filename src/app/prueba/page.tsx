
"use server"
import {auth} from "~/auth"

export default async function HomePage() {
    const session = await auth();
    interface EmailRecipient {
      emailAddress: {
        address: string;
      };
    }
    
    interface EmailMessage {
      subject: string;
      body: {
        contentType: string;
        content: string;
      };
      toRecipients: EmailRecipient[];
    }
    
    async function sendEmail() {
      const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjYtVDVRcWdYNDdFTG5qT2Q4dUlkVmhyemVmWjN1c3BOdUs4elhLWE5yaUUiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyIsImtpZCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzc2Yzg4NS0xYzlkLTQzZjUtYWM4Yi00ODg0ODY5YTNmMTYvIiwiaWF0IjoxNzM4MDA5Nzk0LCJuYmYiOjE3MzgwMDk3OTQsImV4cCI6MTczODAxNDU2NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhaQUFBQTFoTTNHb2ZmY1FEWXVuaTVpekF3MzF3bUtmckIxdWcxSUFNV1NENUlSYXpUM0VxdUxlOEZQdDdVYWVlNGhCSHciLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik1UQyBTaGlwcGluZyBhbmQgUmVjZWl2aW5nIiwiYXBwaWQiOiI0MjY3MmUxNi1lYTQ5LTRiZmEtYWJkMC00NmQzOGRiYThiODIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlNpbHZhIFRlbGxvIiwiZ2l2ZW5fbmFtZSI6Ikp1YW4gRGllZ28iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODcuMTg5LjU3LjE1MSIsIm5hbWUiOiJTaWx2YSBUZWxsbyBKdWFuIERpZWdvIiwib2lkIjoiNWE4Y2YyYTUtY2JlZC00MWVlLWFhMjItNzU3Y2E3YWUxMjA3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxMjA2RUY0QzYiLCJyaCI6IjEuQVhnQWhjaDJfSjBjOVVPc2kwaUVocG9fRmdNQUFBQUFBQUFBd0FBQUFBQUFBQUI0QUM1NEFBLiIsInNjcCI6ImVtYWlsIG9wZW5pZCBwcm9maWxlIFVzZXIuUmVhZCIsInNpZCI6IjAwMTJhNTg5LTkxMzMtNjM4Yy0wOTE4LWRjZjc0OTEyMDM2OCIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Ikg2bWU0N0Nyc2hVSmtYdFJLdVpTdjE1eGhKbTBTa3FYMlJ5MThGYlJ2N3MiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJmYzc2Yzg4NS0xYzlkLTQzZjUtYWM4Yi00ODg0ODY5YTNmMTYiLCJ1bmlxdWVfbmFtZSI6IkwyMDExMjE2NkBjZGp1YXJlei50ZWNubS5teCIsInVwbiI6IkwyMDExMjE2NkBjZGp1YXJlei50ZWNubS5teCIsInV0aSI6IlNmLVgwd1MxNUVTY2lqamxuaGdzQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfZnRkIjoiS1lQemxqQzBpVFd5WTZRNU1IX29QT0NUSGNtX1pwNm9RQTJBU1puRFNkYyIsInhtc19pZHJlbCI6IjE2IDEiLCJ4bXNfc3QiOnsic3ViIjoiSWVEU1JNWGpxZ2ZBbW9Hcm1vS1E1bVBDX1FFd3Q3LTJaX1Y2WEQ3LXBHYyJ9LCJ4bXNfdGNkdCI6MTYwNzYzMTQzM30.TJk6dH0m03QjtjrQ0rn-ajE2FLuYA7dsNfnAiWBkRQcRc-CnZDfepMvMxeTJ2n3QRRxE1deqWe4InFMuHp6NusbhDLCWOZPLvfAlitAF4AweLK3udKs680XR-VHLGAkkaMBXG_Ix3vIYS88u7-ZPehD5aPL-w39bYLBefAtOlwih0V_skHhUC0deh4MwpxdnB_GCrSJcAS5QguZDW7B5-PAv3yDcLTlg9hXl--b9DDyAyatXwOfanRdeaEs50eqNgdCC27FPwTScR1LvIXIR4dmECDDnc0GQ4YuZSNo-2VDJahbBs-aMT0Q9XKWVIF6h8MbzHxRXPMyfPZD0-I7JRQ"; // Replace with your actual token
    
      const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: "Hola",
            body: {
              contentType: "Text",
              content: "Hola",
            },
            toRecipients: [
              {
                emailAddress: {
                  address: "l20112166@cdjuarez.tecnm.mx",
                },
              },
            ],
          },
          saveToSentItems: "true",
        }),
      });
    
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error("Response error:", errorText); // Log the error
        throw new Error(`Error sending email: ${errorText}`);
      }
    }
    
    sendEmail()


  return (
    <main className="flex min-h-screen flex-col p-6 ">
    </main>
  )
}

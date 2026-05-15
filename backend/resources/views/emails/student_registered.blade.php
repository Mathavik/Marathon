<!DOCTYPE html>
<html>
<head>
    <title>Registration Success</title>
</head>

<body style="font-family: Arial; background:#f4f6f8; padding:20px;">

    <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:12px; text-align:center; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

        <h2 style="color:#16a34a;">🎉 Registration Successful!</h2>

        <p style="font-size:16px;">Hi <strong>{{ $student->name }}</strong>,</p>

        <p style="font-size:14px; color:#555;">
            Your registration for <b>FestHub 2026</b> has been completed successfully ✅
        </p>

        <hr style="margin:20px 0;">

        <div style="text-align:left; font-size:14px;">
            <p><b>📧 Email:</b> {{ $student->email }}</p>
            <p><b>🏫 School:</b> {{ $student->school_name }}</p>
            <p><b>📍 City:</b> {{ $student->city }}</p>
        </div>

        <hr style="margin:20px 0;">

        <p style="color:#555;">
            We are excited to have you join us 🚀  
        </p>

        <p style="margin-top:15px;">
            👉 Login and start registering for events now!
        </p>

        <br>

        <!-- <p style="font-size:12px; color:#888;">
            Thanks & Regards,<br>
            <b>FestHub Team ❤️</b>
        </p> -->

    </div>

</body>
</html>
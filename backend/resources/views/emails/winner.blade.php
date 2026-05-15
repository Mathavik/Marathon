<!DOCTYPE html>
<html>
<head>
    <title>Congratulations!</title>
</head>
<body>
    <h1>🎉 Congratulations {{ $student->name }}!</h1>
    <p>You have won the <strong>{{ $event->name }}</strong> event!</p>
    <p>Prize: <strong>{{ $prize }}</strong></p>
    <p>We are thrilled to celebrate your achievement. Keep shining!</p>
    <p>— Event Admin</p>
</body>
</html>
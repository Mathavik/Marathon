<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial; }
        h2 { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
    </style>
</head>
<body>

<h1>School Wise Student Report</h1>

@foreach($grouped as $school => $students)
    <h2>{{ $school }}</h2>

    <table>
        <thead>
            <tr>
                <th>Student Name</th>
                <th>Event Name</th>
            </tr>
        </thead>
        <tbody>
            @foreach($students as $row)
                <tr>
                    <td>{{ $row->student_name }}</td>
                    <td>{{ $row->event_name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endforeach

</body>
</html>
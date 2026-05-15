<h2 style="text-align:center;">{{ $event->name }}</h2>

@if(isset($data))
    @foreach($data as $school => $students)
        <h3>{{ $school }}</h3>
        <table border="1" width="100%" cellspacing="0" cellpadding="5" style="border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th>Student Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                @foreach($students as $student)
                <tr>
                    <td>{{ $student->name }}</td>
                    <td>{{ $student->email }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach
@endif
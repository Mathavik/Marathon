<h2 style="text-align:center;">{{ $event->name }} - Registered Schools</h2>

<table border="1" width="100%" cellspacing="0" cellpadding="5" style="border-collapse: collapse;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th width="10%">S.No</th>
            <th>School Name</th>
        </tr>
    </thead>
    <tbody>
        @foreach($data as $key => $school)
        <tr>
            <td align="center">{{ $key + 1 }}</td>
            <td>{{ $school->school_name }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
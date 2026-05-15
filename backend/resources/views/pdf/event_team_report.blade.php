<h2 style="text-align:center;">{{ $event->name }} - Team Report</h2>

@foreach($teams as $school => $schoolTeams)
    <h3>{{ $school }}</h3>

    <table border="1" width="100%" cellspacing="0" cellpadding="5" style="border-collapse: collapse;">
        <thead>
            <tr style="background-color: #f2f2f2;">
                <th>Team Name</th>
                <th>Captain Email</th> {{-- Pudhu Column --}}
            </tr>
        </thead>
        <tbody>
            @foreach($schoolTeams as $team)
            <tr>
                <td>{{ $team->team_name }}</td>
                <td>{{ $team->email }}</td> {{-- Inga email display aagum --}}
            </tr>
            @endforeach
        </tbody>
    </table>
@endforeach
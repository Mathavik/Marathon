<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendEventMails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-event-mails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function handle()
{
    $today = \Carbon\Carbon::today();

    $events = \App\Models\Event::with('students')->get();

    foreach ($events as $event) {

        // 🔔 REMINDER
        $eventDate = \Carbon\Carbon::parse($event->event_date);

        if (true)
             {

            foreach ($event->students as $student) {
                \Mail::to($student->email)
                    ->send(new \App\Mail\EventReminderMail($student, $event));
            }
        }

        // 🏁 COMPLETED
        if ($event->status === 'completed') {

            foreach ($event->students as $student) {
                \Mail::to($student->email)
                    ->send(new \App\Mail\EventCompletedMail($student, $event));
            }
        }
    }

    $this->info('Mails sent');
}
}

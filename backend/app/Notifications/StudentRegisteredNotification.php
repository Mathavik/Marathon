<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
// app/Notifications/StudentRegisteredNotification.php

use Illuminate\Notifications\Messages\DatabaseMessage;

class StudentRegisteredNotification extends Notification
{
    protected $student;

    public function __construct($student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
{
    return [
        'student_id'   => $this->student->id,
        'student_name' => $this->student->name, // Adding this key
        'school_name'  => $this->student->school_name, // Adding this key
        'message'      => $this->student->name . ' from ' . $this->student->school_name . ' registered.'
    ];
}
}
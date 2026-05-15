<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventCompletedMail extends Mailable
{
    public $student;
    public $event;

    public function __construct($student, $event)
    {
        $this->student = $student;
        $this->event = $event;
    }

    public function build()
    {
        return $this->subject('🎉 Event Completed')
            ->view('emails.event_completed');
    }
}

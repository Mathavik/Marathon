<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf; // ✅ IMPORTANT

class WinnerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $student;
    public $event;
    public $prize;

    /**
     * Create a new message instance.
     */
    public function __construct($student, $event, $prize)
    {
        $this->student = $student;
        $this->event   = $event;
        $this->prize   = $prize;
    }

    /**
     * Email Subject
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🏆 Congratulations! You Won',
        );
    }

    /**
     * Email Body View
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.winner',
            with: [
                'student' => $this->student,
                'event'   => $this->event,
                'prize'   => $this->prize,
            ],
        );
    }

    /**
     * Attach Certificate PDF
     */
 public function attachments(): array
{
    $pdf = Pdf::loadView('pdf.certificate', [
        'student' => $this->student,
        'event'   => $this->event,
        'prize'   => $this->prize,
    ])->setPaper('a4', 'landscape'); // ✅ 'portrait' ஐ 'landscape' ஆக மாற்றியுள்ளேன்

    return [
        Attachment::fromData(
            fn () => $pdf->output(),
            'certificate.pdf'
        )->withMime('application/pdf'),
    ];
}

}
'use client';

// The print stylesheet turns the page into an A4 résumé, so the browser's
// "Save as PDF" destination produces the downloadable copy.
export default function PrintButton() {
    return (
        <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>
            Save as PDF
        </button>
    );
}

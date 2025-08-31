export default function SuccessPage() {
  return (
    <div className="container mx-auto mt-10">
      <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 px-6 py-5 rounded text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">✅ Complaint Submitted Successfully</h2>
        <p className="mb-2">
          Your tracking code has been sent to your email. Please check your inbox
          (and spam/junk folder) to find it.
        </p>
        <p className="mt-4">
          Use the tracking code to monitor the status of your complaint or suggestion.
        </p>
      </div>
    </div>
  );
}

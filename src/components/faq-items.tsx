const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
    <div className="mb-4">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <span className="text-lg dark:text-gray-200">{question}</span>
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <p className="text-gray-600 mt-3 group-open:animate-fadeIn dark:text-gray-400">{answer}</p>
      </details>
    </div>
);

export default FaqItem;
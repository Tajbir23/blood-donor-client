export const BloodRequestEmailTemplate = ({ 
  recipientName, 
  requestDetails 
}: EmailTemplateProps) => {
  return (
    <div>
      <h2>রক্তের অনুরোধ - রক্তদান রংপুর বিভাগ</h2>
      <p>প্রিয় {recipientName},</p>
      <p>রংপুর বিভাগে রক্তের একটি জরুরি অনুরোধ এসেছে যা আপনার রক্তের গ্রুপের সাথে মিলে যায়।</p>
      
      {/* ... email template details ... */}
      
      <p>ধন্যবাদ,<br />রক্তদান রংপুর বিভাগ টিম</p>
    </div>
  );
}; 
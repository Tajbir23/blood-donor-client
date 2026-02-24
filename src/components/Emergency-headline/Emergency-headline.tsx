export default function EmergencyHeadline() {
  const text = '🩸 জরুরি রক্তের প্রয়োজন?  রক্তদাতা খুঁজুন — /find-blood  •  SOS আবেদন করুন — /sos  •  রক্তদান করে জীবন বাঁচান — নিবন্ধন করুন /register  •  ';
  return (
    <div className="bg-red-700 text-white py-1.5 overflow-hidden" role="marquee" aria-label="জরুরি বিজ্ঞপ্তি">
      <div className="animate-marquee text-sm font-medium tracking-wide">
        {text}{text}
      </div>
    </div>
  );
}

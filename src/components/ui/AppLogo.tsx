import Image from 'next/image';
import Link from 'next/link';
import { APP_LOGO, APP_NAME } from '@/lib/constants/app';

interface AppLogoProps {
  showName?: boolean;
  size?: number;
  nameClassName?: string;
  asLink?: boolean;
  className?: string;
}

const AppLogo = ({
  showName = true,
  size = 40,
  nameClassName = 'font-serif text-xl font-bold text-red-700 hover:text-red-800 transition-colors',
  asLink = true,
  className = '',
}: AppLogoProps) => {
  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={APP_LOGO}
        alt={APP_NAME}
        width={size}
        height={size}
        className="w-auto object-contain"
        priority
      />
      {showName && (
        <span className={nameClassName}>{APP_NAME}</span>
      )}
    </div>
  );

  if (asLink) {
    return <Link href="/" aria-label={APP_NAME}>{content}</Link>;
  }

  return content;
};

export default AppLogo;

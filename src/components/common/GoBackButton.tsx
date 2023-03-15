import { useRouter } from 'next/router';

import Icon from '@/components/common/Icons';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button type="button" className="text-left" onClick={() => router.back()}>
      <Icon.Left />
    </button>
  );
};

export default GoBackButton;

'use client';

import confirmationData from '../../../data/confirmation-account.json';

import styles from './page.module.scss';

import { SuccessBanner } from '@milka/organism';

export default function ConfirmationAccount() {

  const successBannerProps = {
    textImg: confirmationData?.textImg,
    textImgMobile: confirmationData?.textImgMobile,
    content: confirmationData?.content,
    cta: confirmationData?.cta,
  }

  return (
      <SuccessBanner {...successBannerProps} />
  );
}

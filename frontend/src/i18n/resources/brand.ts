import type { ResourcePack } from '../config';

// Brand detail page (`#/brand/:slug`): headings, placeholders, CTAs, footer.
export const brand: ResourcePack = {
  ja: {
    brand: {
      wordmarkFallback: 'ブランド',
      allBrands: '← すべてのブランド',
      kicker: '参加ブランド',
      explore: '詳しく見る →',
      learnMore: '詳しくはこちら▶',
      notFound: {
        title: 'ブランドが見つかりません',
        body: '「{slug}」に該当するブランドが見つかりませんでした。',
        browse: 'すべてのブランドを見る',
      },
      hero: {
        videoPlaceholder: 'ブランドアニメーション動画',
        introVideoPlaceholder: 'ブランド紹介動画',
        bannerPlaceholder: 'ヒーローバナー画像',
        bannerAlt: '{name} バナー',
        storyComingSoon: 'ブランドストーリーは近日公開予定です。',
      },
      tokupackSet: {
        title: 'トクパックセット',
        imageAlt: '{name} トクパックセット',
        imagePlaceholder: 'トクパックセット画像',
        detailsComingSoon: 'トクパックの詳細は近日公開予定です',
      },
      usp: {
        title: '商品の特長',
        imagePlaceholder: '商品画像',
        productAlt: '商品 {index}',
      },
      tokupackSeries: {
        title: 'TOKUPACK',
      },
      showcase: {
        productFallback: '商品',
        productAlt: '商品 {index}',
      },
      cta: {
        heading: '{name} とのコラボレーションを始めませんか？',
        button: 'ライブ配信を予約する →',
      },
      footer: {
        participatingBrands: 'CREATOR SOURCING DAY — 参加ブランド',
        poweredBy: 'Powered by ATENE',
      },
    },
  },
  en: {
    brand: {
      wordmarkFallback: 'BRAND',
      allBrands: '← All Brands',
      kicker: 'Participating Brand',
      explore: 'Explore →',
      learnMore: 'Learn more ▶',
      notFound: {
        title: 'Brand not found',
        body: 'We couldn’t find a brand for “{slug}”.',
        browse: 'Browse all brands',
      },
      hero: {
        videoPlaceholder: 'Brand animation video',
        introVideoPlaceholder: 'Brand introduction video',
        bannerPlaceholder: 'Hero banner image',
        bannerAlt: '{name} banner',
        storyComingSoon: 'Brand story coming soon.',
      },
      tokupackSet: {
        title: 'TOKUPACK SET',
        imageAlt: '{name} TokuPack set',
        imagePlaceholder: 'TokuPack set image',
        detailsComingSoon: 'TokuPack details coming soon',
      },
      usp: {
        title: 'PRODUCTS USP',
        imagePlaceholder: 'Product image',
        productAlt: 'Product {index}',
      },
      tokupackSeries: {
        title: 'TOKUPACK',
      },
      showcase: {
        productFallback: 'Product',
        productAlt: 'Product {index}',
      },
      cta: {
        heading: 'Ready to collaborate with {name}?',
        button: 'Book your livestream →',
      },
      footer: {
        participatingBrands: 'CREATOR SOURCING DAY — PARTICIPATING BRANDS',
        poweredBy: 'Powered by ATENE',
      },
    },
  },
  ko: {
    brand: {
      wordmarkFallback: '브랜드',
      allBrands: '← 전체 브랜드',
      kicker: '참여 브랜드',
      explore: '자세히 보기 →',
      learnMore: '자세히 보기 ▶',
      notFound: {
        title: '브랜드를 찾을 수 없습니다',
        body: '“{slug}”에 해당하는 브랜드를 찾을 수 없습니다.',
        browse: '전체 브랜드 보기',
      },
      hero: {
        videoPlaceholder: '브랜드 애니메이션 영상',
        introVideoPlaceholder: '브랜드 소개 영상',
        bannerPlaceholder: '히어로 배너 이미지',
        bannerAlt: '{name} 배너',
        storyComingSoon: '브랜드 스토리가 곧 공개됩니다.',
      },
      tokupackSet: {
        title: '톡팩 세트',
        imageAlt: '{name} 톡팩 세트',
        imagePlaceholder: '톡팩 세트 이미지',
        detailsComingSoon: '톡팩 상세 정보가 곧 공개됩니다',
      },
      usp: {
        title: '제품 특장점',
        imagePlaceholder: '제품 이미지',
        productAlt: '제품 {index}',
      },
      tokupackSeries: {
        title: 'TOKUPACK',
      },
      showcase: {
        productFallback: '제품',
        productAlt: '제품 {index}',
      },
      cta: {
        heading: '{name}와(과) 협업을 시작해 보세요',
        button: '라이브 방송 예약하기 →',
      },
      footer: {
        participatingBrands: 'CREATOR SOURCING DAY — 참여 브랜드',
        poweredBy: 'Powered by ATENE',
      },
    },
  },
};

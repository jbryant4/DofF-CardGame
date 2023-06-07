import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const TwoArmyIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 980 975.0857"
      {...props}
      ref={ref}
      width={size}
      height={size}
    >
      <defs>
        <style>
          {`   .pr2a-1 {
                  fill: url(#linear-gradient-2a);
              }

                  .pr2a-2 {
                  fill: #fff;
              }

                  .pr2a-3 {
                  fill: url(#linear-gradient-2a-3);
              }

                  .pr2a-4 {
                  fill: url(#linear-gradient-2a-4);
              }

                  .pr2a-5 {
                  fill: url(#linear-gradient-2a-2);
              }`}
        </style>
        <linearGradient
          id="linear-gradient-2a"
          x1="490"
          y1="-28.5545"
          x2="490"
          y2="969.3093"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ffce79" />
          <stop offset=".0595" stop-color="#f6c572" />
          <stop offset=".1554" stop-color="#deae5f" />
          <stop offset=".2756" stop-color="#b88940" />
          <stop offset=".4142" stop-color="#825516" />
          <stop offset=".4572" stop-color="#714408" />
          <stop offset=".7321" stop-color="#e2be47" />
          <stop offset=".7417" stop-color="#dfbc45" />
          <stop offset=".9957" stop-color="#ae8e1f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2a-2"
          x1="487.3215"
          y1="813.868"
          x2="487.3215"
          y2="68.408"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#000" />
          <stop offset="1" stop-color="#28393f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2a-3"
          x1="303.8469"
          y1="672.6581"
          x2="925.5037"
          y2="68.2098"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#fff" />
          <stop offset="1" stop-color="#e5f1f5" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2a-4"
          x1="301.8485"
          y1="672.6581"
          x2="923.5053"
          y2="68.2098"
          gradientTransform="translate(978) rotate(-180) scale(1 -1)"
          xlinkHref="#linear-gradient-2a-3"
        />
      </defs>
      <path
        className="pr2a-1"
        d="M965.07,800.126l-20.7796-20.7796c-9.6098-9.6074-22.3978-14.8995-36.0071-14.8995-8.4848,0-16.6514,2.058-23.9213,5.9311l-67.9152-67.9297c3.4333-5.5982,6.3904-11.4808,8.8566-17.6306,52.3936-71.815,80.0544-156.7679,80.0544-246.0543,0-57.6663-11.4006-113.1312-33.9272-165.2588l26.7885-27.0886c3.5937-3.635,6.4025-7.9697,8.254-12.7345l70.9961-182.8505c5.3747-13.845,2.0289-29.5609-8.5189-40.0163-10.5477-10.4566-26.2928-13.6567-40.0916-8.1617l-183.5539,73.1562c-4.5632,1.8187-8.7205,4.5194-12.2389,7.9491l-10.0253,9.7775c-69.1058-47.1477-151.6191-72.81-235.7191-72.81-84.0466,0-163.813,24.3162-232.6066,70.622l-7.7838-7.5895c-3.5159-3.4297-7.6757-6.1304-12.2377-7.9491L51.1408,2.6531C37.3456-2.8455,21.6006,.3594,11.0504,10.8148,.5015,21.2702-2.8444,36.9849,2.5316,50.8311L73.5253,233.6815c1.8503,4.7648,4.6591,9.0996,8.254,12.7345l23.1183,23.3758c-23.3625,52.9367-35.6135,110.8095-35.6135,168.9715,0,96.153,33.3137,189.6466,93.9395,264.0153l-67.5871,67.6017c-7.2736-3.878-15.4377-5.9336-23.9213-5.9336-13.6153,0-26.4046,5.2945-36.0059,14.8995l-20.7832,20.782C5.3015,809.7528,.0009,822.5457,.0009,836.1525c0,10.7373,3.3021,20.9691,9.4227,29.5341-3.4552,8.842-5.2629,18.3425-5.2629,28.12,0,20.6022,8.022,39.9701,22.5825,54.527,14.569,14.5715,33.9394,22.5971,54.544,22.5971,9.7848,0,19.2877-1.8078,28.1224-5.2605,8.5638,6.1158,18.7896,9.4155,29.5208,9.4155,13.6081,0,26.4034-5.3018,36.0217-14.9262l20.7881-20.7869c16.1849-16.1921,19.1686-40.665,8.9489-59.9139l67.9334-67.9322c19.103,11.7578,41.1194,17.825,64.3093,17.3657,47.9836,18.5247,98.5306,27.9086,150.3896,27.9086,52.0729,0,102.7924-9.4519,150.9242-28.1103,24.7402,1.5478,48.6955-4.585,69.1301-17.1641l67.9322,67.9297c-10.2173,19.2464-7.2335,43.7241,8.9562,59.9211l20.782,20.782c9.6244,9.6244,22.4173,14.9262,36.0217,14.9262,10.7324,0,20.9594-3.2997,29.5244-9.4179,8.8372,3.4552,18.3377,5.2629,28.1176,5.2629,20.6022,0,39.975-8.0232,54.544-22.5947,14.5618-14.5618,22.5825-33.9272,22.5825-54.5294,0-9.7799-1.8078-19.2828-5.2605-28.12,6.1207-8.5675,9.4227-18.7993,9.4227-29.5341,0-13.6068-5.3018-26.3997-14.9287-36.0265Z"
      />
      <g>
        <circle className="pr2a-5" cx="487.3215" cy="438.763" r="380.7155" />
        <g>
          <path
            className="pr2a-3"
            d="M759.1237,110.4792L240.2284,616.4561l120.4493,120.4493L871.6816,220.1726l70.9945-182.8504-183.5524,73.157Zm99.5272,101.2403l-498.0294,503.6461-42.6585-42.6585L902.9384,97.6732l-44.2874,114.0463Z"
          />
          <polygon points="902.9384 97.6732 858.6509 211.7195 352.2602 723.6641 309.6017 681.0056 902.9384 97.6732" />
          <g>
            <path
              className="pr2a-2"
              d="M113.7694,911.6678l-7.3297,7.3018c-13.8732,13.9013-36.4241,13.9013-50.3254,0-6.9365-6.9367-10.4188-16.0637-10.4188-25.1627,0-9.1271,3.4823-18.226,10.4188-25.1625l7.3018-7.3299,50.3533,50.3533Z"
            />
            <path d="M81.2874,933.6083c-10.6355,0-20.6333-4.1412-28.1519-11.6612-7.5145-7.5145-11.6529-17.5082-11.6529-28.1409s4.1384-20.6264,11.6529-28.1409l10.2748-10.3118,56.3229,56.3202-10.3201,10.2789c-7.498,7.5117-17.489,11.6557-28.1258,11.6557Zm-17.8661-66.3304l-4.3236,4.3387c-5.9279,5.9293-9.1902,13.8085-9.1902,22.1897s3.2622,16.2603,9.1847,22.1842c5.9279,5.9266,13.8099,9.1929,22.1951,9.1929s16.2576-3.2636,22.1718-9.1902l4.3469-4.3304-44.3848-44.3848Z" />
          </g>
          <g>
            <rect
              x="128.4409"
              y="832.8642"
              width="42.2973"
              height="35.5853"
              transform="translate(-557.6901 354.9254) rotate(-44.9998)"
            />
            <path d="M147.216,884.1499l-31.1193-31.1193,35.8666-35.8666,31.1193,31.1193-35.8666,35.8666Zm-19.2058-31.1193l19.2058,19.2058,23.9531-23.9531-19.2058-19.2058-23.9531,23.9531Z" />
          </g>
          <g>
            <polygon points="272.7489 752.6882 244.8903 780.5188 219.7276 755.3843 247.5862 727.5257 272.7489 752.6882" />
            <path d="M244.8905,786.4727l-31.122-31.0864,33.8179-33.8179,31.122,31.122-33.8179,33.7822Zm-19.2031-31.0918l19.2031,19.1839,21.8989-21.8797-19.2031-19.2031-21.8989,21.8989Z" />
          </g>
          <g>
            <polygon
              className="pr2a-2"
              points="219.7276 755.3843 244.8903 780.5188 218.6042 806.8329 193.4417 781.6421 173.0813 802.0306 198.2438 827.1933 177.1253 848.2839 151.9626 823.1212 122.054 853.03 96.8913 827.8673 222.3956 702.3348 247.5862 727.5257 219.7276 755.3843"
            />
            <path d="M122.0534,858.9874l-31.1193-31.1193,131.4609-131.4897,31.1494,31.1467-27.857,27.8557,25.1612,25.1351-32.2451,32.2766-25.1625-25.1872-14.405,14.4229,25.1666,25.168-27.0782,27.0439-25.1612-25.1625-29.9098,29.9098Zm-19.2058-31.1193l19.2058,19.2058,29.9098-29.9098,25.1639,25.1625,15.1565-15.1359-25.1584-25.157,26.3158-26.3528,25.1625,25.1927,20.3289-20.3522-25.1639-25.1351,27.8598-27.8612-19.2332-19.2332-119.5474,119.5762Z" />
          </g>
          <g>
            <polygon points="218.6042 806.8329 198.2438 827.1933 173.0813 802.0306 193.4417 781.6421 218.6042 806.8329" />
            <path d="M198.2431,833.1502l-31.1179-31.1165,26.3158-26.3528,31.1179,31.1549-26.3158,26.3144Zm-19.2072-31.122l19.2072,19.2085,14.405-14.4064-19.2072-19.225-14.405,14.4229Z" />
          </g>
          <g>
            <path
              className="pr2a-2"
              d="M166.0605,909.7021l-20.7817,20.7815c-3.5104,3.5104-9.1831,3.5104-12.6935,0l-69.1692-69.1692-18.8158-18.8157c-3.5104-3.5104-3.5104-9.1833,0-12.6937l20.7815-20.7817c3.4825-3.4823,9.1833-3.4823,12.6656,0l88.0132,88.0132c3.4823,3.4823,3.4823,9.1831,0,12.6656Z"
            />
            <path d="M138.9309,937.7633c-3.6352,0-7.0551-1.4179-9.6303-3.9931l-87.9852-87.9852c-2.5752-2.5752-3.9931-5.9979-3.9931-9.6317,0-3.6366,1.4179-7.0592,3.9931-9.6344l20.7827-20.78c2.5601-2.5615,5.9759-3.9712,9.6166-3.9712s7.0565,1.4097,9.618,3.9739l88.0113,88.0099c5.3026,5.304,5.3026,13.932,0,19.236l-20.7814,20.7827c-2.5752,2.5752-5.9951,3.9931-9.6317,3.9931Zm-67.2162-126.7067c-1.1587,0-2.2406,.4443-3.0469,1.2506l-20.7841,20.7827c-1.6894,1.6866-1.6894,4.4374,0,6.124l87.9852,87.9852c1.6894,1.6894,4.436,1.6894,6.1254,0l20.7814-20.7827c1.6812-1.6784,1.6812-4.4154,0-6.0939l-88.0126-88.0126c-.8077-.809-1.8896-1.2533-3.0483-1.2533Z" />
          </g>
          <g>
            <path
              className="pr2a-2"
              d="M386.2897,762.5174c-28.645,28.645-75.0666,28.645-103.7116,0l-9.8292-9.8292-25.1627-25.1625-25.1906-25.1908-9.8292-9.8292c-28.645-28.645-28.645-75.0666,0-103.7116l173.7233,173.7233Z"
            />
            <path d="M334.4335,791.5984c-21.6137,0-41.9371-8.4222-57.2266-23.709l-70.0122-70.0108c-15.2881-15.2895-23.7076-35.6142-23.7076-57.228s8.4195-41.9385,23.7076-57.228l5.3712-5.3698,184.4667,184.464-5.3712,5.3726c-15.2895,15.2868-35.6129,23.709-57.228,23.709Zm-121.5631-191.7563c-9.1984,11.5734-14.1911,25.807-14.1911,40.8086,0,17.5548,6.8398,34.0647,19.2579,46.4856l70.0122,70.0081c12.4195,12.4208,28.928,19.2607,46.4842,19.2607,15.0002,0,29.2365-4.9941,40.8099-14.1925l-162.3731-162.3703Z" />
          </g>
        </g>
        <g>
          <path
            className="pr2a-4"
            d="M37.3222,37.3222L108.3167,220.1726l511.0039,516.7328,120.4493-120.4493L220.8747,110.4792,37.3222,37.3222Zm39.7378,60.351L662.0354,672.707l-42.6585,42.6585L121.3474,211.7195l-44.2874-114.0463Z"
          />
          <polygon points="77.06 97.6732 121.3474 211.7195 627.7381 723.6641 670.3967 681.0056 77.06 97.6732" />
          <g>
            <path
              className="pr2a-2"
              d="M866.229,911.6678l7.3297,7.3018c13.8732,13.9013,36.4241,13.9013,50.3254,0,6.9365-6.9367,10.4188-16.0637,10.4188-25.1627,0-9.1271-3.4823-18.226-10.4188-25.1625l-7.3018-7.3299-50.3533,50.3533Z"
            />
            <path d="M870.5851,921.9527l-10.3201-10.2789,56.3229-56.3202,10.2748,10.3118c7.5145,7.5145,11.6529,17.5082,11.6529,28.1409,0,10.6327-4.1384,20.6264-11.6529,28.1409-7.5186,7.52-17.5164,11.6612-28.1519,11.6612-10.6368,0-20.6278-4.1439-28.1258-11.6557Zm1.6071-10.2899l4.3469,4.3304c5.9142,5.9266,13.7893,9.1902,22.1718,9.1902,8.3852,0,16.2672-3.2663,22.1951-9.1929,5.9225-5.9238,9.1847-13.8031,9.1847-22.1842,0-8.3811-3.2622-16.2603-9.1902-22.1897l-4.3236-4.3387-44.3848,44.3848Z" />
          </g>
          <g>
            <rect
              x="812.6161"
              y="829.5082"
              width="35.5853"
              height="42.2973"
              transform="translate(-358.2842 836.3427) rotate(-45.0002)"
            />
            <path d="M796.9158,848.2834l31.1193-31.1193,35.8666,35.8666-31.1193,31.1193-35.8666-35.8666Zm31.1193-19.2058l-19.2058,19.2058,23.9531,23.9531,19.2058-19.2058-23.9531-23.9531Z" />
          </g>
          <g>
            <polygon points="707.2495 752.6882 735.108 780.5188 760.2707 755.3843 732.4122 727.5257 707.2495 752.6882" />
            <path d="M701.29,752.6904l31.122-31.122,33.8179,33.8179-31.122,31.0864-33.8179-33.7822Zm31.122-19.2085l-19.2031,19.2031,21.8989,21.8797,19.2031-19.1839-21.8989-21.8989Z" />
          </g>
          <g>
            <polygon
              className="pr2a-2"
              points="760.2707 755.3843 735.108 780.5188 761.3941 806.8329 786.5567 781.6421 806.9171 802.0306 781.7545 827.1933 802.8731 848.2839 828.0358 823.1212 857.9444 853.03 883.1071 827.8673 757.6028 702.3348 732.4122 727.5257 760.2707 755.3843"
            />
            <path d="M828.0351,829.0776l-25.1612,25.1625-27.0782-27.0439,25.1666-25.168-14.405-14.4229-25.1625,25.1872-32.2451-32.2766,25.1612-25.1351-27.857-27.8557,31.1494-31.1467,131.4609,131.4897-31.1193,31.1193-29.9098-29.9098Zm-70.4318-120.7856l-19.2332,19.2332,27.8598,27.8612-25.1639,25.1351,20.3289,20.3522,25.1625-25.1927,26.3158,26.3528-25.1584,25.157,15.1565,15.1359,25.1639-25.1625,29.9098,29.9098,19.2058-19.2058-119.5474-119.5762Z" />
          </g>
          <g>
            <polygon points="761.3941 806.8329 781.7545 827.1933 806.9171 802.0306 786.5567 781.6421 761.3941 806.8329" />
            <path d="M755.4395,806.8358l31.1179-31.1549,26.3158,26.3528-31.1179,31.1165-26.3158-26.3144Zm31.1179-19.2305l-19.2072,19.225,14.405,14.4064,19.2072-19.2085-14.405-14.4229Z" />
          </g>
          <g>
            <path
              className="pr2a-2"
              d="M813.9379,909.7021l20.7817,20.7815c3.5104,3.5104,9.1831,3.5104,12.6935,0l69.1692-69.1692,18.8158-18.8157c3.5104-3.5104,3.5104-9.1833,0-12.6937l-20.7815-20.7817c-3.4825-3.4823-9.1833-3.4823-12.6656,0l-88.0132,88.0132c-3.4823,3.4823-3.4823,9.1831,0,12.6656Z"
            />
            <path d="M831.4358,933.7702l-20.7814-20.7827c-5.3026-5.304-5.3026-13.932,0-19.236l88.0113-88.0099c2.5615-2.5642,5.9773-3.9739,9.618-3.9739s7.0565,1.4097,9.6166,3.9712l20.7827,20.78c2.5752,2.5752,3.9931,5.9979,3.9931,9.6344,0,3.6338-1.4179,7.0565-3.9931,9.6317l-87.9852,87.9852c-2.5752,2.5752-5.9951,3.9931-9.6303,3.9931s-7.0565-1.4179-9.6317-3.9931Zm73.7996-121.4603l-88.0126,88.0126c-1.6812,1.6784-1.6812,4.4154,0,6.0939l20.7814,20.7827c1.6894,1.6894,4.436,1.6894,6.1254,0l87.9852-87.9852c1.6894-1.6866,1.6894-4.4374,0-6.124l-20.7841-20.7827c-.8063-.8063-1.8882-1.2506-3.0469-1.2506-1.1587,0-2.2406,.4443-3.0483,1.2533Z" />
          </g>
          <g>
            <path
              className="pr2a-2"
              d="M593.7087,762.5174c28.645,28.645,75.0666,28.645,103.7116,0l9.8292-9.8292,25.1627-25.1625,25.1906-25.1908,9.8292-9.8292c28.645-28.645,28.645-75.0666,0-103.7116l-173.7233,173.7233Z"
            />
            <path d="M588.3369,767.8894l-5.3712-5.3726,184.4667-184.464,5.3712,5.3698c15.2881,15.2895,23.7076,35.6115,23.7076,57.228,0,21.6137-8.4195,41.9385-23.7076,57.228l-70.0122,70.0108c-15.2895,15.2868-35.6129,23.709-57.2266,23.709-21.6151,0-41.9385-8.4222-57.228-23.709Zm16.418-5.677c11.5734,9.1984,25.8098,14.1925,40.8099,14.1925,17.5562,0,34.0647-6.8398,46.4842-19.2607l70.0122-70.0081c12.4181-12.4208,19.2579-28.9307,19.2579-46.4856,0-15.0015-4.9927-29.2352-14.1911-40.8086l-162.3731,162.3703Z" />
          </g>
        </g>
      </g>
    </svg>
  )
);

export default TwoArmyIcon;
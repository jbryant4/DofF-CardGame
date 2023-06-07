import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const EarthFoundationIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 980 980"
      width={size}
      height={size}
      ref={ref}
      {...props}
    >
      <defs>
        <style>
          {`   .efi-1 {
                fill: none;
            }

                .efi-2 {
                fill: #1ba227;
            }

                .efi-3 {
                fill: #7bae00;
            }`}
        </style>
      </defs>
      <circle className="efi-2" cx="490" cy="490" r="490" />
      <path d="M920.0502,489.9919c0,63.749-13.8605,124.2699-38.7595,178.6732-23.161-28.2626-45.8027-65.5775-46.5025-66.7513,.0678,.0226,1.4222,.7676,23.0255,12.6641-33.4321-47.27-89.9123-195.9649-89.9123-195.9649,0,0-33.4321,102.5987-72.6205,205.175-35.7347-33.4095-64.5616-95.6685-64.5616-95.6685l49.5724,13.8377c-59.934-73.7718-127.9494-263.9804-127.9494-263.9804-16.0049,81.2214-119.4164,262.2649-121.0192,265.1091l42.6423-18.4203-32.2808,65.7129-78.377-111.8316,48.3987,10.0003c-56.4802-53.41-122.1931-268.2017-122.1931-268.2017,0,0-26.5019,66.8642-56.4802,140.636-29.9556,73.7718-82.9819,154.4513-82.9819,154.4513l48.3987-19.5942-73.772,117.5881,66.8643-27.6758-76.5937,114.8791c-35.0348-62.2591-55.0128-134.1122-55.0128-210.638C59.9354,252.4908,252.4917,59.9345,489.9928,59.9345s430.0574,192.5562,430.0574,430.0574Z" />
      <path
        className="efi-3"
        d="M881.2906,668.6651c-67.8349,148.3338-217.5231,251.3842-391.2979,251.3842-160.9752,0-301.3178-88.4451-375.0446-219.4194l76.5937-114.8791-66.8643,27.6758,73.772-117.5881-48.3987,19.5942s53.0263-80.6795,82.9819-154.4513c29.9783-73.7718,56.4802-140.636,56.4802-140.636,0,0,65.7129,214.7917,122.1931,268.2017l-48.3987-10.0003,78.377,111.8316,32.2808-65.7129-42.6423,18.4203c1.6028-2.8442,105.0143-183.8878,121.0192-265.1091,0,0,68.0155,190.2086,127.9494,263.9804l-49.5724-13.8377s28.8269,62.259,64.5616,95.6685c39.1884-102.5763,72.6205-205.175,72.6205-205.175,0,0,56.4802,148.695,89.9123,195.9649-21.6033-11.8965-22.9577-12.6415-23.0255-12.6641,.6998,1.1739,23.3416,38.4888,46.5025,66.7513Z"
      />
      <path d="M490.0001,929.0886c-242.1139,0-439.0886-196.9736-439.0886-439.0886S247.8861,50.9113,490.0001,50.9113s439.0875,196.9747,439.0875,439.0886-196.9736,439.0886-439.0875,439.0886Zm0-860.1181c-232.1562,0-421.0294,188.8732-421.0294,421.0294s188.8732,421.0294,421.0294,421.0294,421.0283-188.8721,421.0283-421.0294S722.1563,68.9705,490.0001,68.9705Z" />
      <line
        className="efi-1"
        x1="431.323"
        y1="543.0859"
        x2="431.3004"
        y2="543.1085"
      />
    </svg>
  )
);

export default EarthFoundationIcon;
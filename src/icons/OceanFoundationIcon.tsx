import { forwardRef } from 'react';

type OwnProps = React.SVGProps<SVGSVGElement> & { size?: number };

const OceanFoundationIcon = forwardRef<SVGSVGElement, OwnProps>(
  ({ size = 128, ...props }, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 980 980"
      {...props}
      ref={ref}
      width={size}
      height={size}
    >
      <defs>
        <style>
          {`    .ofi-1 {
                    fill: #0072ff;
                }

                .ofi-2 {
                    fill: #8cf6f3;
                }`}
        </style>
      </defs>
      <circle className="ofi-1" cx="490" cy="490" r="490" />
      <path d="M399.2169,389.412s86.4905-98.2118,168.3336-71.3123c81.8202,26.8766,127.4233,142.6245,43.2451,224.4446-84.1552,81.8431-118.06,66.6421-175.3387,28.0671-57.3017-38.5749-127.4235,17.5363-202.2613,52.6086-59.7053,27.9754-119.8686,12.7286-162.7475-26.0297-8.7223-34.271-13.3697-70.1904-13.3697-107.1857C57.0783,250.9083,250.892,57.0717,490.0113,57.0717c209.2206,0,383.7582,148.4165,424.1188,345.6869-40.0172-74.357-123.852-187.5408-263.5919-187.5408-208.0761,0-251.3213,174.1942-251.3213,174.1942Z" />
      <path
        className="ofi-2"
        d="M922.9211,490.0046c0,239.0963-193.8136,432.9099-432.9099,432.9099-202.1239,0-371.8767-138.4808-419.5633-325.7242,42.8789,38.7583,103.0422,54.0051,162.7475,26.0297,74.8378-35.0724,144.9596-91.1836,202.2613-52.6086,57.2788,38.5751,91.1836,53.776,175.3387-28.0671,84.1782-81.8202,38.5751-197.5681-43.2451-224.4446-81.8431-26.8995-168.3336,71.3123-168.3336,71.3123,0,0,43.2452-174.1942,251.3213-174.1942,139.7399,0,223.5747,113.1839,263.5919,187.5408v.0229c5.7691,28.1815,8.791,57.3474,8.791,87.2231Z"
      />
      <path d="M489.9997,929.7936c-242.5022,0-439.7926-197.2904-439.7926-439.7926S247.4975,50.2072,489.9997,50.2072s439.7926,197.2904,439.7926,439.7938-197.2904,439.7926-439.7926,439.7926Zm0-865.8505C255.0708,63.9431,63.9429,255.0721,63.9429,490.001s191.1278,426.0567,426.0567,426.0567,426.0567-191.1289,426.0567-426.0567S724.9275,63.9431,489.9997,63.9431Z" />
    </svg>
  )
);

export default OceanFoundationIcon;

import React from "react";
import { Link } from "react-router-dom";
import bithumb from "../../assets/images/bithumb_logo.png";

const NavLogo = (): JSX.Element => {
  return (
    // <Link to="/" className="basis-1/4">
    //   <svg
    //     width="40"
    //     height="40"
    //     viewBox="0 0 144 150"
    //     fill="none"
    //     // xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       d="M113.63 92.7964L113.617 92.7932L113.604 92.7906L97.2661 89.5906L95.9121 89.3254L96.7819 90.3964C100.958 95.5394 104.122 100.048 105.845 103.639C106.707 105.436 107.191 106.969 107.279 108.216C107.366 109.45 107.065 110.363 106.398 111.01L106.398 111.01C105.734 111.654 104.835 111.929 103.652 111.82C102.455 111.709 100.999 111.204 99.3019 110.318C95.9093 108.547 91.6894 105.329 86.8753 101.069L85.7928 100.111L86.0521 101.533L89.2081 118.84L89.2093 118.846C89.4011 119.827 89.5 120.838 89.5 121.875C89.5 130.25 82.9908 137 75 137C67.0092 137 60.5 130.25 60.5 121.875C60.5 120.166 60.835 118.538 61.3452 116.981L61.3474 116.974L67.2154 98.1425L66.3898 97.6349L66.738 97.9938C66.3898 97.6349 66.3897 97.635 66.3896 97.6351L66.3891 97.6356L66.3872 97.6374L66.3795 97.6449L66.3492 97.6743L66.231 97.789L65.782 98.2247L64.177 99.7822C62.8474 101.072 61.0712 102.796 59.2851 104.529C55.7564 107.952 52.1966 111.405 51.9547 111.635L50.5663 112.828C50.5653 112.829 50.5642 112.83 50.5632 112.831C46.539 116.176 41.5268 118.25 36 118.25C23.0412 118.25 12.5 107.3 12.5 93.75C12.5 80.2005 23.0412 69.25 36 69.25H54.402H55.5196L54.7748 68.4168C48.283 61.1548 43.0051 54.641 39.8585 49.463C38.2832 46.8705 37.264 44.6478 36.8793 42.8553C36.4951 41.0649 36.7607 39.8072 37.6023 38.99C38.4443 38.1726 39.6817 37.941 41.4028 38.3633C43.13 38.7871 45.2499 39.8517 47.7123 41.4854C52.6304 44.7483 58.7748 50.1857 65.6503 56.9136L66.5 57.7451V56.5563V37.5C66.5 23.9505 77.0412 13 90 13C102.959 13 113.5 23.9505 113.5 37.5C113.5 44.5934 110.568 50.9254 105.948 55.3972L88.831 70.8476L89.3287 71.6915L89.166 71.2188C89.3287 71.6915 89.3288 71.6915 89.329 71.6914L89.3298 71.6912L89.333 71.6901L89.3459 71.6856L89.3969 71.6681L89.5959 71.5996L90.3521 71.3396C91.0041 71.1155 91.9367 70.7951 93.0593 70.4098C95.3043 69.6394 98.3087 68.6098 101.346 67.5732C104.384 66.5366 107.454 65.4931 109.831 64.6949C111.019 64.2957 112.034 63.9582 112.783 63.7136C113.506 63.4777 113.949 63.3398 114.082 63.3067L114.084 63.3064L114.084 63.3063L114.085 63.3062L114.089 63.3056L114.105 63.3031L114.168 63.2934C114.208 63.2873 114.261 63.2793 114.325 63.2698C114.349 63.2662 114.375 63.2624 114.403 63.2585C114.601 63.2295 114.877 63.1909 115.184 63.1524C115.806 63.0742 116.528 63 117.006 63C124.991 63 131.5 69.7503 131.5 78.125C131.5 86.4995 124.991 93.25 117 93.25C116.749 93.25 116.009 93.163 115.242 93.0556C114.479 92.9487 113.784 92.8352 113.63 92.7964Z"
    //       fill="white"
    //       stroke="black"
    //     />
    //     <path
    //       opacity="0.3"
    //       d="M77.6384 69.0954C87.2319 79.1385 95.6933 88.5139 101.107 95.9985C103.817 99.7449 105.74 102.986 106.669 105.58C107.608 108.203 107.468 109.971 106.398 111.01C105.325 112.051 103.593 112.146 101.075 111.145C98.5804 110.154 95.4938 108.152 91.9347 105.337C84.8247 99.7128 75.9552 90.948 66.3616 80.9046C56.7681 70.8614 48.3067 61.4861 42.8926 54.0015C40.1826 50.255 38.2596 47.014 37.331 44.4197C36.3921 41.7966 36.5316 40.0291 37.6022 38.99C38.6752 37.9486 40.4069 37.8545 42.9247 38.8546C45.4196 39.8457 48.5062 41.848 52.0653 44.6632C59.1753 50.2872 68.0448 59.052 77.6384 69.0954Z"
    //       fill="white"
    //       stroke="black"
    //     />
    //   </svg>
    // </Link>
      <Link to="/" className="basis-1/4">
          <img className="w-10 h-10" src = {bithumb}/>
      </Link>
  );
};

export default NavLogo;

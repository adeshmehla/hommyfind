 
export default (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
      /* config options here */
      output:'export',
      distDir:'dist',
      images:{
        unoptimized:true,
      }
    }
    return nextConfig
  }
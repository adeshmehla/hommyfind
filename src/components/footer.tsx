import Link from 'next/link';
import { Facebook, Twitter, Linkedin, InstagramIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-200 py-12 w-full">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-6">About Us</h3>
                        <p className="text-gray-400 mb-4">
                            We are committed to providing the best property listings with an easy-to-use platform that makes finding your dream property a breeze.
                        </p>
                        <p className="text-gray-400 mb-4">
                            Our mission is to connect buyers and sellers with the most reliable and up-to-date property information.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook className="text-gray-400 hover:text-white text-2xl" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter className="text-gray-400 hover:text-white text-2xl" />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon className="text-gray-400 hover:text-white text-2xl" />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="text-gray-400 hover:text-white text-2xl" />
                            </Link>
                        </div>
                    </div>
                    <div  className="mb-8">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div  className="mb-8">
                        <h4 className="text-lg font-semibold mb-4">Property Listings</h4>
                        <ul className="space-y-2">
                            <li><Link href="/residential" className="text-gray-400 hover:text-white">Residential</Link></li>
                            <li><Link href="/commercial" className="text-gray-400 hover:text-white">Commercial</Link></li>
                            <li><Link href="/workshops" className="text-gray-400 hover:text-white">Workshops</Link></li>
                            <li><Link href="/single-rooms" className="text-gray-400 hover:text-white">Single Rooms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-400 mt-8">
                    <p>Designed by Shalu</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

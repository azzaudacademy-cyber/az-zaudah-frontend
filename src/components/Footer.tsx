import { Link } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Az-Zaudah Academy" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-base text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
                  Az-Zaudah Academy
                </span>
                <span className="text-xs text-muted-foreground">الزودة</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn Qur'an online with trusted and reliable tutors. Live one-to-one recitation, Tajweed, Hifdh, Arabic & Islamic studies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Learn
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/courses/quran-recitation" className="hover:text-primary transition-colors">
                  Qur'an Recitation
                </Link>
              </li>
              <li>
                <Link to="/courses/tajweed" className="hover:text-primary transition-colors">
                  Tajweed
                </Link>
              </li>
              <li>
                <Link to="/courses/hifdh-qiraah" className="hover:text-primary transition-colors">
                  Hifdh & Qiraa'ah
                </Link>
              </li>
              <li>
                <Link to="/courses/arabic" className="hover:text-primary transition-colors">
                  Arabic
                </Link>
              </li>
              <li>
                <Link to="/courses/islamic-studies" className="hover:text-primary transition-colors">
                  Islamic Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/find-teacher" className="hover:text-primary transition-colors">
                  Find Teacher
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/certification" className="hover:text-primary transition-colors">
                  Teacher Certification
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/donate" className="hover:text-accent transition-colors flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  Donate (Sadaqah Jāriyah)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Az-Zaudah Academy. All rights reserved. Built with sincerity for Allah's sake.
          </p>
          <p className="text-sm text-muted-foreground italic">
            "For every step you take is a path to success"
          </p>
        </div>
      </div>
    </footer>
  );
};

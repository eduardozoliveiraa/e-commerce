import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { Facebook, Instagram, Twitter } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Acessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Services</h3>
            <Link href="#">Contact</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About us</h3>
            <p className="mb-2">
              apijoehfbeihaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
            <p>
              &copy;{new Date().getFullYear()} E~Shop. Todos os direitos
              reservados
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow us</h3>
            <div className="flex gap-2">
              <Link href="#">
                { <Facebook size={24}/> }
              </Link>
              <Link href="#">
                { <Twitter size={24} /> }
              </Link>
              <Link href="#">
                { <Instagram size={24} /> }
              </Link>
             
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

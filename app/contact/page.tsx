"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "پیام شما با موفقیت ارسال شد",
        description: "کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "خطا در ارسال پیام",
        description: "متأسفانه مشکلی در ارسال پیام رخ داده است. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8 text-center">تماس با ما</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-6">اطلاعات تماس</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full ml-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">آدرس</h3>
                <p className="text-gray-600">
                  تهران، خیابان آزادی، پلاک ۱۲۳، فروشگاه رنو پارتس
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full ml-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">تلفن تماس</h3>
                <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                <p className="text-gray-600">۰۹۱۲۳۴۵۶۷۸۹</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full ml-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">ایمیل</h3>
                <p className="text-gray-600">info@renault-parts.com</p>
                <p className="text-gray-600">support@renault-parts.com</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-4">ساعات کاری</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>شنبه تا چهارشنبه:</span>
                <span>۹ صبح تا ۶ عصر</span>
              </div>
              <div className="flex justify-between">
                <span>پنج‌شنبه:</span>
                <span>۹ صبح تا ۱ بعد از ظهر</span>
              </div>
              <div className="flex justify-between">
                <span>جمعه:</span>
                <span>تعطیل</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207254.46391504937!2d51.21673453281252!3d35.697076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1651234567890!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold mb-6">فرم تماس</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">ایمیل</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">شماره تماس</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">موضوع</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">پیام</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-4 w-4 ml-2" />
                      ارسال پیام
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, {useState} from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email đã được gửi thành công!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        alert('Có lỗi xảy ra khi gửi email.');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi gửi email.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };

  return (
    <div>
  
  {/*  contact */}
  <div className="contact mb-4">
    <div className="container">
    <div className="row">
        <div className="col-sm-12">
          <div className="ru_bg">
            <div className="row">
              <div className="col-md-3">
                <a href="index.html">
                  {" "}
                  <img
                    className="logo_fooetr"
                    src="./assets/images/logo_footer.png"
                    alt="#"
                  />
                </a>
              </div>
              <div className="col-md-9">
                <ul className="lacation">
                  <li>
                    <i className="fa fa-map-marker" aria-hidden="true" /> 
                    223/16 Trường Chinh, Đà Nẵng
                  </li>
                  <li>
                    <i
                      className="fa fa-volume-control-phone"
                      aria-hidden="true"
                    />{" "}
                    (+84) 0775522664
                  </li>
                  <li>
                    <i className="fa fa-envelope" aria-hidden="true" />{" "}
                    trien112345@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row d_flex">
        <div className="col-md-6">
          <form id="request" className="main_form" onSubmit={handleSubmit}>
            <div className="row">
            <div className="col-md-12">
            <div className="titlepage">
              <h2>Contact Us</h2>
            </div>
          </div>
              <div className="col-md-12 ">
                <input
                  className="contactus"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <input
                  className="contactus"
                  placeholder="Phone number"
                  type="tel"
                  value={formData.phone}
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <input
                  className="contactus"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <textarea
                  className="textarea"
                  placeholder="Message"
                  type="text"
                  name="message"
                  onChange={handleChange}
                  required
                  defaultValue={formData.message}
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <button className="send_btn" type='submit'>Send</button>
              </div>
              <div className="col-md-6 col-sm-6">
                <ul className="social_icon">
                  <li>
                    <a href="Javascript:void(0)">
                    <i class="fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                    <i class="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                    <i class="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                    <i class="fa-brands fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="map_main">
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=223+Trường+Chinh,+Thanh+Khê,+Đà+Nẵng"
                width={600}
                height={378}
                frameBorder={0}
                style={{ border: 0, width: "100%" }}
                allowFullScreen=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    </div>
  )
}

export default Contact
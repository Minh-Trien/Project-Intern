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
  <div className="back_re">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="title">
            <h2>Contact Us</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*  contact */}
  <div className="contact">
    <div className="container">
      <div className="row d_flex">
        <div className="col-md-6">
          <form id="request" className="main_form" onSubmit={handleSubmit}>
            <div className="row">
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
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="Javascript:void(0)">
                      <i className="fa fa-linkedin-square" aria-hidden="true" />
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
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Eiffel+Tower+Paris+France"
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
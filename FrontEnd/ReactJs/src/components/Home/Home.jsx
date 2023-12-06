import React from 'react'
import { NavLink } from 'react-router-dom';
function Home(){
    return(
    <div>
  <div className="plane">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="titlepage">
            <h2>Our Nails</h2>
            <span>
            The paint design is all made by hand.{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="plan_bax text_align_center">
            <figure>
              <img className='img-plan' src="./assets/images/plan_img.jpg" alt="#" />
            </figure>
            <div id="ho_plan" className="plan_text">
              <h3>Nails Design</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod t dolor in reprehenderit in voluptate{" "}
              </p>
              <a className="read_more" href="Javascript:void(0)">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="plan_bax text_align_center">
            <figure>
              <img  className='img-plan' src="./assets/images/plan_img1.jpg" alt="#" />
            </figure>
            <div id="ho_plan" className="plan_text">
              <h3>BEST NAILS TRENDING</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod t dolor in reprehenderit in voluptate{" "}
              </p>
              <a className="read_more" href="Javascript:void(0)">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="plan_bax text_align_center">
            <figure>
              <img  className='img-plan' src="./assets/images/plan_img2.jpg" alt="#" />
            </figure>
            <div id="ho_plan" className="plan_text">
              <h3>lOVING</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod t dolor in reprehenderit in voluptate{" "}
              </p>
             {/* <NavLink className="read_more" to='/'></NavLink> */}
              <a className="read_more" >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="groomsmen">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="titlepage">
            <h2>Bridesmaids And Groomsmen</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod t dolor in reprehenderit in voluptate{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="brid text_align_center">
            <figure>
              <img src="./assets/images/ber_img.jpg" alt="#" />
            </figure>
            <h3> Voluptate </h3>
          </div>
        </div>
        <div className="col-md-4 margin_top70">
          <div className="brid text_align_center">
            <figure>
              <img src="./assets/images/ber_img1.jpg" alt="#" />
            </figure>
            <h3> Voluptate </h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="brid text_align_center">
            <figure>
              <img src="./assets/images/ber_img2.jpg" alt="#" />
            </figure>
            <h3> Voluptate </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="about">
    <div className="container ">
      <div className="row d_flex">
        <div className="col-md-5">
          <div className="titlepage">
            <h2>About Our Company</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
            </span>
            <a className="read_more" href="Javascript:void(0)">
              {" "}
              Read More
            </a>
          </div>
        </div>
        <div className="col-md-7">
          <div className="about_img">
            <figure>
              <img src="./assets/images/about.png" alt="#" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="blog">
    <div className="container ">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>FROM THE BLOG</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="blog_bg margin_bottom30">
            <div className="row d_flex">
              <div className="col-md-6">
                <div className="blog_img">
                  <figure>
                    <img src="./assets/images/blog_img1.jpg" alt="#" />
                  </figure>
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="marriage_text">
                  <span>Post by : CHERRY TRÀ </span>
                  <h3>Tempor incididunt ut labore et dolore</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                  <h4>
                    <strong>Like</strong>{" "}
                    <strong className="padd_right">Comment</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="blog_bg">
            <div className="row d_flex">
              <div className="col-md-6">
                <div className="blog_img">
                  <figure>
                    <img src="./assets/images/blog_img2.jpg" alt="#" />
                  </figure>
                  
                </div>
              </div>
              <div className="col-md-6">
                <div className="marriage_text">
                  <span>Post by : TRIENKAITO </span>
                  <h3>Tempor incididunt ut labore et dolore</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore
                  </p>
                  <h4>
                    <strong>Like</strong>{" "}
                    <strong className="padd_right">Comment</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="says">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage">
            <h2>What Is Says Our GROOMS</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div
            id="proj"
            className="carousel slide says_ban"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li data-target="#proj" data-slide-to={0} className="active" />
              <li data-target="#proj" data-slide-to={1} />
              <li data-target="#proj" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container">
                  <div className="carousel-caption relative3">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="readert">
                          <div className="readert_img text_align_center">
                            <figure>
                              <img src="./assets/images/saya.png" alt="#" />
                            </figure>
                          </div>
                          <div className="readert_text">
                            <h3>Jacksmith sand</h3>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the <br /> majority have
                              suffered alteration in some form
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="carousel-caption relative3">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="readert">
                          <div className="readert_img text_align_center">
                            <figure>
                              <img src="./assets/images/saya.png" alt="#" />
                            </figure>
                          </div>
                          <div className="readert_text">
                            <h3>Jacksmith sand</h3>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the <br /> majority have
                              suffered alteration in some form
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container">
                  <div className="carousel-caption relative3">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="readert">
                          <div className="readert_img text_align_center">
                            <figure>
                              <img src="./assets/images/saya.png" alt="#" />
                            </figure>
                          </div>
                          <div className="readert_text">
                            <h3>Jacksmith sand</h3>
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the <br /> majority have
                              suffered alteration in some form
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#proj"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-arrow-left" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#proj"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-arrow-right" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="contact">
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="ru_bg">
            <div className="row">
              <div className="col-md-3">
                <a href="index.html">
                  {" "}
                  {/* <img
                    className="logo_fooetr"
                    src=""
                    alt="#"
                  /> */}
                </a>
                <h2 >Contact Us</h2>
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
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Contact Us</h2>
            </div>
          </div>
          <form id="request" className="main_form">
            <div className="row">
              <div className="col-md-12 ">
                <input
                  className="contactus"
                  placeholder="Name"
                  type="type"
                  name="Name"
                />
              </div>
              <div className="col-md-12">
                <input
                  className="contactus"
                  placeholder="Phone number"
                  type="type"
                  name="Phone number"
                />
              </div>
              <div className="col-md-12">
                <input
                  className="contactus"
                  placeholder="Email"
                  type="type"
                  name="Email"
                />
              </div>
              <div className="col-md-12">
                <textarea
                  className="textarea"
                  placeholder="Message"
                  type="type"
                  message="Name"
                  defaultValue={""}
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <button className="send_btn">Send</button>
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
);  
}
export default Home;
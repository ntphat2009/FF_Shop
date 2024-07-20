
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
const DetailPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://localhost:44389/api/Post/${id}`);
        setPost(response.data); 
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchPost();

    return () => {
    };
  }, [id]);
 
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <>
        <ToastContainer/>
  <section className="py-3 bg-light">
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
        
        <li className="breadcrumb-item active" aria-current="page">{post.Title}</li>
      </ol>
    </div>
  </section>
  {/* ========================= SECTION CONTENT ========================= */}
  <section className="section-content bg-white padding-y">
    <div className="container">
      {/* ============================ ITEM DETAIL ======================== */}
      <main >
          <article className="post-info-aside">
            <h2 className="title mt-3">{post.Title}</h2>
            
            <h4>{post.Description} </h4>
           
          </article> {/* post-info-aside .// */}
        </main> 
      <div className="card">
          <div className="thumbs-wrap" >
                <div> <a href="#">
                {/* <img src={process.env.PUBLIC_URL + '/images/items/15.jpg'}/> */}
                <img style={{width:"100%"}} src={require(`../../../public/images/items/img/${post.Image}`)}/>

                  </a></div>
              </div>
          </div> 
      
      
      {/* ================ ITEM DETAIL END .// ================= */}
    </div> {/* container .//  */}
  </section>
  {/* ========================= SECTION CONTENT END// ========================= */}
  {/* ========================= SECTION  ========================= */}
  <section className="section-name padding-y bg">
    <div className="container">
    <h5 className="title-description" style={{ letterSpacing: '0.1em' }}>{post.Detail}</h5>

      
    </div> {/* container .//  */}
  </section>
  {/* ========================= SECTION CONTENT END// ========================= */}
  {/* ========================= SECTION SUBSCRIBE  ========================= */}
  <section className="padding-y-lg bg-light border-top">
    <div className="container">
      <p className="pb-2 text-center">Delivering the latest post trends and industry news straight to your inbox</p>
      <div className="row justify-content-md-center">
        <div className="col-lg-4 col-sm-6">
          <form className="form-row">
            <div className="col-8">
              <input className="form-control" placeholder="Your Email" type="email" />
            </div> {/* col.// */}
            <div className="col-4">
              <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope" /> Subscribe </button>
            </div> {/* col.// */}
          </form>
          <small className="form-text">We’ll never share your email address with a third-party. </small>
        </div> {/* col-md-6.// */}
      </div>
    </div>
  </section>
  {/* ========================= SECTION SUBSCRIBE END// ========================= */}

        </>
    </div>
  )
}

export default DetailPost
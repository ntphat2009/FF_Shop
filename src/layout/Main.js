import React from "react";
import { Routes, Route } from "react-router-dom";
import BackendLayout from "../components";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow, CategoryTrash } from "../components/Category";
import ProductList from '../components/product/ProductList';
import ProductCreate from '../components/product/ProductCreate';
import ProductEdit from '../components/product/ProductEdit';
import ProductTrash from '../components/product/ProductTrash';
import ProductShow from '../components/product/ProductShow';
import BrandList from "../components/Brand/BrandList";
import BrandCreate from "../components/Brand/BrandCreate";
import BrandEdit from "../components/Brand/BrandEdit";
import BrandTrash from "../components/Brand/BrandTrash";
import BrandShow from "../components/Brand/BrandShow";
import UserList from '../components/User/UserList';
import UserShow from '../components/User/UserShow';
import UserTrash from '../components/User/UserTrash';
import UserCreate from '../components/User/UserCreate';
import UserEdit from '../components/User/UserEdit';
// import LoginPage from "../components/LoginPage";
import TopicsList from './../components/Topic/TopicList';
import TopicsCreate from './../components/Topic/TopicCreate';
import TopicsEdit from './../components/Topic/TopicEdit';
import TopicsTrash from './../components/Topic/TopicTrash';
import TopicsShow from './../components/Topic/TopicShow';
import PostList from './../components/Post/PostList';
import { PostCreate } from "../components/Post";
import PostEdit from './../components/Post/PostEdit';
import PostTrash from './../components/Post/PostTrash';
import PostShow from './../components/Post/PostShow';
import TagList from './../components/Tag/TagList';
import TagCreate from './../components/Tag/TagCreate';
import TagEdit from './../components/Tag/TagEdit';
import TagTrash from './../components/Tag/TagTrash';
import TagShow from './../components/Tag/TagShow';
import BannerList from './../components/Banner/BannerList';
import BannerCreate from './../components/Banner/BannerCreate';
import BannerEdit from './../components/Banner/BannerEdit';
import BannerTrash from './../components/Banner/BannerTrash';
import BannerShow from './../components/Banner/BannerShow';



const Main = () => {
  return (
    <main>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}

        <Route path="/" element={<BackendLayout />} />
        <Route path="/admin/product" element={<ProductList />} />
        <Route path="/admin/product/create" element={<ProductCreate />} />
        <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
        <Route path="/admin/product/trash" element={<ProductTrash />} />
        <Route path="/admin/product/show/:id" element={<ProductShow />} />

        <Route path="/admin/category" element={<CategoryList />} />
        <Route path="/admin/category/create" element={<CategoryCreate />} />
        <Route path="/admin/category/edit/:id" element={<CategoryEdit />} />
        <Route path="/admin/category/trash" element={<CategoryTrash />} />
        <Route path="/admin/category/show/:id" element={<CategoryShow />} />

        <Route path="/admin/brand" element={<BrandList />} />
        <Route path="/admin/brand/create" element={<BrandCreate />} />
        <Route path="/admin/brand/edit/:id" element={<BrandEdit />} />
        <Route path="/admin/brand/trash" element={<BrandTrash />} />
        <Route path="/admin/brand/show/:id" element={<BrandShow />} />

        <Route path="/admin/user" element={<UserList />} />
        <Route path="/admin/user/create" element={<UserCreate />} />
        <Route path="/admin/user/edit/:id" element={<UserEdit />} />
        <Route path="/admin/user/trash" element={<UserTrash />} />
        <Route path="/admin/user/show/:userName" element={<UserShow />} />
       
        <Route path="/admin/topic" element={<TopicsList />} />
        <Route path="/admin/topic/create" element={<TopicsCreate />} />
        <Route path="/admin/topic/edit/:id" element={<TopicsEdit />} />
        <Route path="/admin/topic/trash" element={<TopicsTrash />} />
        <Route path="/admin/topic/show/:id" element={<TopicsShow />} />

        <Route path="/admin/post" element={<PostList />} />
        <Route path="/admin/post/create" element={<PostCreate />} />
        <Route path="/admin/post/edit/:id" element={<PostEdit />} />
        <Route path="/admin/post/trash" element={<PostTrash />} />
        <Route path="/admin/post/show/:id" element={<PostShow />} />

        <Route path="/admin/tag" element={<TagList />} />
        <Route path="/admin/tag/create" element={<TagCreate />} />
        <Route path="/admin/tag/edit/:id" element={<TagEdit />} />
        <Route path="/admin/tag/trash" element={<TagTrash />} />
        <Route path="/admin/tag/show/:id" element={<TagShow />} />

        <Route path="/admin/banner" element={<BannerList />} />
        <Route path="/admin/banner/create" element={<BannerCreate />} />
        <Route path="/admin/banner/edit/:id" element={<BannerEdit />} />
        <Route path="/admin/banner/trash" element={<BannerTrash />} />
        <Route path="/admin/banner/show/:id" element={<BannerShow />} />
      </Routes>
    </main>
  );
};

export default Main;

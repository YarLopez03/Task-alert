import api from "./api";

export const createCategory = (data) =>
  api.post("/category/create", data);

export const getCategoryById = (id) =>
  api.get(`/category/${id}`);

export const getCategoriesByUser = (userId) =>
  api.get(`/category/list/${userId}`);

export const updateCategory = (id, userId, data) =>
  api.put(`/category/update/${id}/${userId}`, data);

export const deleteCategory = (id, userId) =>
  api.delete(`/category/delete/${id}/${userId}`);
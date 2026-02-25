import api from "./api";

export const createTask = (data) =>
  api.post("/task/create", data);

export const getTaskById = (id) =>
  api.get(`/task/${id}`);

export const getTasksByUser = (userId) =>
  api.get(`/task/list/${userId}`);

export const getTasksByUserAndCategory = (userId, categoryId) =>
  api.get(`/task/list/${userId}/${categoryId}`);

export const updateTask = (id, userId, data) =>
  api.put(`/task/update/${id}/${userId}`, data);

export const toggleTaskStatus = (id, userId, data) =>
  api.put(`/task/extension/${id}/${userId}`, data);

export const deleteTask = (id, userId) =>
  api.delete(`/task/delete/${id}/${userId}`);
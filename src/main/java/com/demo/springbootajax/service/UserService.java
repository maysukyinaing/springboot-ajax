package com.demo.springbootajax.service;

import com.demo.springbootajax.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    User findById(Integer id);
    void delete(Integer id);
    List<User> findAllUser();
}

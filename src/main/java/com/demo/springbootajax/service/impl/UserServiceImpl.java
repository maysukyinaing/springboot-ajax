package com.demo.springbootajax.service.impl;

import com.demo.springbootajax.model.User;
import com.demo.springbootajax.repository.UserRepository;
import com.demo.springbootajax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalStateException("INVALID ID "+id));
    }

    @Override
    public void delete(Integer id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }

    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }
}

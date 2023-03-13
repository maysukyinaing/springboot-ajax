package com.demo.springbootajax.controller;

import com.demo.springbootajax.model.User;
import com.demo.springbootajax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUser();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Integer id) {
        User user = userService.findById(id);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@Validated @RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Integer id, @Validated @RequestBody User userDetails) {
        User user = userService.findById(id);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setName(userDetails.getName());
        user.setPhone(userDetails.getPhone());
        user.setEmail(userDetails.getEmail());
        user.setAddress(userDetails.getAddress());
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteNote(@PathVariable(value = "id") Integer id) {
        User user = userService.findById(id);
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.delete(user.getId());
        return ResponseEntity.ok().build();
    }

}

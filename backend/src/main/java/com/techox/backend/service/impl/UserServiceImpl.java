package com.techox.backend.service.impl;

import com.techox.backend.dto.ChangePasswordRequest;
import com.techox.backend.dto.UpdateUserRequest;
import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.User;
import com.techox.backend.repository.TicketMessageRepository;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.repository.UserRepository;
import com.techox.backend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final TicketMessageRepository ticketMessageRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            TicketRepository ticketRepository,
            TicketMessageRepository ticketMessageRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.ticketMessageRepository = ticketMessageRepository;
        this.passwordEncoder = passwordEncoder;
    }


    // =========================================================
    // CREATE USER
    // =========================================================

    @Override
    public User createUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }


    // =========================================================
    // GET ALL USERS
    // =========================================================

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    // =========================================================
    // UPDATE USER PROFILE
    // =========================================================

    @Override
    public User updateUser(
            Long id,
            UpdateUserRequest updatedUser) {

        User user = getUserById(id);

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());

        // Role and password are intentionally not changed
        // through profile editing.

        return userRepository.save(user);
    }


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    @Override
    public void changePassword(
            Long id,
            ChangePasswordRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String loggedInEmail =
                authentication.getName();

        User currentUser =
                userRepository.findByEmail(loggedInEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                ));

        /*
         * A user can only change their own password.
         */
        if (!currentUser.getId().equals(id)) {

            throw new RuntimeException(
                    "You are not authorized to change this password."
            );
        }


        /*
         * Verify current password.
         */
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                currentUser.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect."
            );
        }


        /*
         * New password and confirmation must match.
         */
        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException(
                    "New passwords do not match."
            );
        }


        /*
         * Prevent using the same password again.
         */
        if (passwordEncoder.matches(
                request.getNewPassword(),
                currentUser.getPassword())) {

            throw new RuntimeException(
                    "New password must be different from the current password."
            );
        }


        /*
         * Basic password length requirement.
         */
        if (request.getNewPassword().length() < 6) {

            throw new RuntimeException(
                    "New password must be at least 6 characters."
            );
        }


        /*
         * Encode before storing.
         */
        currentUser.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(currentUser);
    }


    // =========================================================
    // DELETE USER
    // =========================================================

    @Override
    @Transactional
    public void deleteUser(Long id) {

        User user = getUserById(id);

        /*
         * Delete ticket messages first because they reference
         * both User and Ticket.
         */
        ticketMessageRepository.deleteByUser(user);

        /*
         * Delete the user's tickets.
         */
        List<Ticket> tickets =
                ticketRepository.findByUser(user);

        for (Ticket ticket : tickets) {

            ticketRepository.delete(ticket);
        }

        /*
         * Finally delete the user.
         */
        userRepository.delete(user);
    }
}
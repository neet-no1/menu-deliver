<template>
    <main class="login">
        <div class="login-form">
            <h1>Login</h1>

            <input type="text" name="user" id="user" placeholder="user">
            <input type="password" name="password" id="password" placeholder="password">

            <div class="login-btn" @click="api_login">
                Enter
            </div>
            <div class="login-btn" @click="api_test">
                Enter
            </div>
        </div>
    </main>
</template>

<script src="../scripts/Login.js"></script>

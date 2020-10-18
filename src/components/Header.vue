<template>
    <header class="flex justify-between p-5 border-b items-center">
        <h1 class="font-semibold text-2xl leading-tight hover:opacity-50">
            <router-link to="/"> Throw Money </router-link>
        </h1>
        <div>
            <button
                class="py-2 px-5 mr-3 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white"
            >
                <router-link to="/login"> ログイン </router-link>
            </button>
            <button
                class="py-2 px-5 ml-3 border-2 border-blue-800 rounded hover:bg-blue-800 hover:text-white"
            >
                <router-link to="/register"> 新規登録 </router-link>
            </button>
        </div>
    </header>
</template>
<svelte:head>
    <title>Contact Me</title>
</svelte:head>

<article>
    <section>
        <h2>Contact Me</h2>
        <p>
            Have a project in mind, or want to connect? Feel free to reach out
            using the form below:
        </p>
        <form action="https://api.web3forms.com/submit" method="POST">
            <input
                type="hidden"
                name="access_key"
                value="41a05436-6f5b-4ece-8a84-6ebe30a88406"
            />
            <div class="flex flex-col p-2">
                <label for="name" class="font-bold mb-1">Name:</label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    class="bg-[color:var(--background-input)] border-[color:var(--border-input)] p-2 rounded-xl border-2 border-solid"
                />
            </div>
            <div class="flex flex-col p-2">
                <label for="email" class="font-bold mb-1">Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    class="bg-[color:var(--background-input)] border-[color:var(--border-input)] p-2 rounded-xl border-2 border-solid"
                />
            </div>
            <div class="flex flex-col p-2">
                <label for="message" class="font-bold mb-1">Message:</label>
                <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Your Message"
                    class="bg-[color:var(--background-input)] border-[color:var(--border-input)] p-2 rounded-xl border-2 border-solid"
                ></textarea>
            </div>
            <div class="flex justify-center mt-2">
                <button
                    type="submit"
                    class="bg-[var(--button-primary)] rounded-2xl p-4 transition-[var(--transition-delay)] hover:text-[color:var(--hover-text)] hover:bg-[var(--hover-background)]"
                    >Submit</button
                >
            </div>
        </form>
    </section>
</article>

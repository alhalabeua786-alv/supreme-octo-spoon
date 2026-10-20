
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");

    const pages = [
        ["home.html", "الرئيسية"],
        ["services.html", "خدماتنا"],
        ["requests.html", "طلبات الخدمات"],
        ["about.html", "من نحن"],
        ["news.html", "الأخبار والإعلانات"],
        ["areas.html", "مناطق التغطية"],
        ["contact.html", "تواصل معنا"],
        ["logout.php", "تسجيل الخروج"]
    ];

    const currentPage =
        location.pathname.split("/").pop() || "home.html";

    // إنشاء رأس الموقع والقائمة
    if (header) {
        header.innerHTML = `
            <header class="site-header">
                <div class="header-inner">

                    <button
                        class="menu-button"
                        id="menu-toggle"
                        type="button"
                        aria-label="فتح القائمة"
                        aria-expanded="false">
                        ☰
                    </button>

                    <a class="brand" href="home.html">
                        <span class="brand-icon">💧</span>
                        <span class="brand-name">
                            الهيئة القومية للمياه
                        </span>
                    </a>

                    <div class="header-actions">
                        <button
                            class="small-button"
                            id="theme-toggle"
                            type="button"
                            aria-label="تغيير الوضع">
                            🌙
                        </button>
                    </div>
                </div>

                <nav
                    class="side-menu"
                    id="side-menu"
                    aria-label="القائمة الرئيسية">

                    ${pages.map(function (page) {
                        const active =
                            page[0] === currentPage ? "active" : "";

                        return `
                            <a
                                class="${active}"
                                href="${page[0]}">
                                ${page[1]}
                            </a>
                        `;
                    }).join("")}
                </nav>
            </header>
        `;

        const menuButton =
            document.getElementById("menu-toggle");

        const menu =
            document.getElementById("side-menu");

        // فتح وإغلاق القائمة
        menuButton.addEventListener("click", function () {
            const opened = menu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );
        });

        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener("click", function (event) {
            if (
                !menu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                menu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });

        // الوضع الداكن
        const themeButton =
            document.getElementById("theme-toggle");

        try {
            if (localStorage.getItem("water-theme") === "dark") {
                document.body.classList.add("dark-mode");
                themeButton.textContent = "☀️";
            }
        } catch (error) {
            console.warn("تعذر حفظ إعداد الوضع الداكن.");
        }

        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const dark =
                document.body.classList.contains("dark-mode");

            themeButton.textContent = dark ? "☀️" : "🌙";

            try {
                localStorage.setItem(
                    "water-theme",
                    dark ? "dark" : "light"
                );
            } catch (error) {
                console.warn("تعذر حفظ إعداد الوضع.");
            }
        });
    }

    // إنشاء تذييل الموقع
    if (footer) {
        footer.innerHTML = `
            <footer class="site-footer">
                <p>💧 الهيئة القومية للمياه</p>
                <p>معاً للمحافظة على المياه وخدمة المجتمع</p>
                <p>
                    © ${new Date().getFullYear()}
                    جميع الحقوق محفوظة
                </p>
            </footer>
        `;
    }
    // البحث في مناطق التغطية
    const areaSearch =
        document.getElementById("area-search");

    if (areaSearch) {
        areaSearch.addEventListener("input", function () {
            const query =
                areaSearch.value.trim().toLowerCase();

            document.querySelectorAll(".area-card")
                .forEach(function (card) {
                    const name =
                        (card.dataset.area || "").toLowerCase();

                    card.hidden = !name.includes(query);
                });
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username =
                document.getElementById("username").value.trim();

            const password =
                document.getElementById("password").value;

            if (!username || !password) {
                alert("أدخلي اسم المستخدم وكلمة المرور");
                return;
            }

            sessionStorage.setItem("suqyaUsername", username);

            window.location.href = "home.html";
        });
    }
});

const showRegister = document.getElementById("showRegister");
const registerBox = document.getElementById("registerBox");
const backToLogin = document.getElementById("backToLogin");
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (showRegister) {
  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    registerBox.hidden = false;
  });
}

if (backToLogin) {
  backToLogin.addEventListener("click", function () {
    registerBox.hidden = true;
    registerMessage.textContent = "";
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("newName").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      registerMessage.textContent = "كلمتا المرور غير متطابقتين.";
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("sukiaUsers") || "[]"
    );

    if (users.some(user => user.username === username)) {
      registerMessage.textContent = "اسم المستخدم موجود مسبقًا.";
      return;
    }

    users.push({ name, username, password });

    localStorage.setItem("sukiaUsers", JSON.stringify(users));

    registerMessage.textContent =
      "تم إنشاء الحساب التجريبي بنجاح. يمكنك تسجيل الدخول.";

    registerForm.reset();
  });
}
document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logoutLink");

    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();

            const confirmLogout = confirm("هل تريد تسجيل الخروج؟");

            if (confirmLogout) {
                window.location.href = "index.html";
            }
        });
    }
});

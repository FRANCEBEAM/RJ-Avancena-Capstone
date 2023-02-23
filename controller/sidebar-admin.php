
    <div class="sidebar <?php echo $sidebar; ?>" id="sidebar">
        <div class="logo-details">
            <i class='bi bi-wrench-adjustable-circle-fill icon cursor-pointer' onclick="location.href='/index.php'"></i>
                <div class="logo-name cursor-pointer" onclick="location.href='/index.php'">RJ Avanceña</div>
            <i class='bx bx-menu' id="btn"></i>
        </div>
        
        <div class="menu-bar">
        <ul class="nav-list ps-0">
            <li>
                <a href="/administrator/dashboard.php" class="dashboard-tab">
                    <i class='bx bxs-grid-alt'></i>
                    <span class="hyperlinks">Dashboard</span>
                </a>
                <span class="tooltip">Dashboard</span>
            </li>
            <li>
                <a href="/administrator/merchandise.php" class="merchandise-tab">
                    <i class='bx bxs-cart-alt'></i>
                    <span class="hyperlinks">Merchandise</span>
                </a>
                <span class="tooltip">Merchandise</span>
            </li>

            <!-- <li>
                <a href="/administrator/online-orders.php" class="online-orders-tab">
                    <i class='bi bi-bag-fill'></i>
                    <span class="hyperlinks">Online Orders</span>
                </a>
                <span class="tooltip">Online Orders</span>
            </li> -->
            <li>
                <a href="/administrator/accounts.php" class="accounts-tab">
                    <i class='bi bi-person-circle'></i>
                    <span class="hyperlinks active">Accounts</span>
                </a>
                <span class="tooltip">Accounts</span>
            </li>
            <li>
                <a href="/administrator/inventory.php" class="inventory-tab">
                    <i class='bx bxs-box'></i>
                    <span class="hyperlinks">Inventory</span>
                </a>
                <span class="tooltip">Inventory</span>
            </li>
            <li>
                <a href="/administrator/transactions.php" class="transactions-tab">
                    <i class='bx bxs-credit-card'></i>
                    <span class="hyperlinks">Transactions</span>
                </a>
                <span class="tooltip">Transactions</span>
            </li>
            <!-- <li>
                <a href="/administrator/messages.php" class="messages-tab">
                    <span class="position-absolute top-5 mb-3 end-0 translate-middle p-1 bg-danger border border-0 rounded-circle blink"></span>
                    <i class='bx bxs-chat'></i>
                    <span class="hyperlinks">Messages</span>
                </a>
                <span class="tooltip">Messages</span>
            </li> -->
            <li>
                <a href="/administrator/settings.php" class="settings-tab">
                    <i class='bx bxs-cog'></i>
                    <span class="hyperlinks">Settings</span>
                </a>
                <span class="tooltip">Setting</span>
            </li>
            <li>
                <span>
                <a href="#" onclick="DarkMode();" id="themeDiv">
                    <i id="themeIcon"></i>
                    <input type="hidden" id="themeInput">
                    <input type="hidden" id="sessionID" value="<?= $_SESSION['userNo'];?>">
                    <input type="hidden" id="User" value="<?= $_SESSION['userID'];?>">
                    <input type="hidden" id="Userlevel" value="<?= $_SESSION['userLv'];?>">
                    <span class="hyperlinks themeTitle">Dark Mode</span>
                </a>
                <span class="tooltip themeTitle">Dark Mode</span>
                </span>
            </li>
            <li class="profile">
                <div class="profile-details" id="contentA">
                    <img class="icon" src="../assets/img/Image.webp" alt="profileImg">
                    <div class="user-profile cursor-pointer" onclick="location.href='../administrator/settings.php'">
                        <div class="name fw-bolder"><?= $_SESSION['userID']; ?></div>
                        <div class="job"><?= $_SESSION['userLv']; ?></div>
                    </div>
                </div>
                <div class="profile-details" id="contentB">
                    <img class="icon" src="https://media.baamboozle.com/uploads/images/628790/1645259933_381326_gif-url.gif" alt="Profile Picture">
                    <div class="user-profile">
                        <div class="name fw-bolder"><span class="time"></span></div>
                        <div class="job"><span class="date"></span></div>
                    </div>
                </div>
                    <i class='bx bx-log-out cursor-pointer' id="logout" onclick="location.href='/controller/logout.php'"></i>
            </li>
        </ul>
        </div>
    </div>

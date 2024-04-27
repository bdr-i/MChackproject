import 'package:flutter/material.dart';
import 'package:mchack/screens/profile.dart';
import 'package:mchack/screens/tasks_screen.dart';
import 'package:mchack/screens/users_leaderboard.dart';

class MyDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Menu',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            title: const Text('Tasks'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const TasksScreen()),
              );
              // Navigate to Page 1
            },
          ),
          ListTile(
            title: const Text('Leaderboard'),
            onTap: () {
              print('hi');
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => UsersLeaderboardScreen()),
              );
              // Navigate to Page 2
            },
          ),
          ListTile(
            title: const Text('User Profile'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const ProfileScreen()),
              );
              // Navigate to Page 3
            },
          ),
        ],
      ),
    );
  }
}

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:mchack/components/drawer.dart';

class UsersLeaderboardScreen extends StatefulWidget {
  List<User> users = [
    User(name: 'John Doe', points: 100),
    User(name: 'Jane Smith', points: 75),
    User(name: 'Mike Johnson', points: 50),
  ];

  UsersLeaderboardScreen({super.key});

  @override
  State<UsersLeaderboardScreen> createState() => _UsersLeaderboardScreenState();
}

class _UsersLeaderboardScreenState extends State<UsersLeaderboardScreen> {
  @override
  void initState() {
    super.initState();
    getUsers();
  }

  Future<void> getUsers() async {
    final response = await http.get(Uri.parse('http://172.20.10.12:8000/api/user'));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        widget.users = List<User>.from(data.map((user) => User.fromJson(user)));
        widget.users.sort((a, b) => b.points.compareTo(a.points));
      });
    } else {
      // Handle error
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MyDrawer(),
      appBar: AppBar(
        title: const Text('Users Leaderboard'),
      ),
      body: ListView.builder(
        itemCount: widget.users.length,
        itemBuilder: (context, index) {
          final user = widget.users[index];
          return ListTile(
            title: Text(user.name),
            subtitle: Text('Total Points: ${user.points}'),
          );
        },
      ),
    );
  }
}

class User {
  final String name;
  final int points;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['identifiant'],
      points: json['points'],
    );
  }

  User({required this.name, required this.points});
}

import 'package:flutter/material.dart';
import 'package:mchack/components/drawer.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: MyDrawer(),
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
            children: [
            Text(
              'John Doe',
              style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 16),
            Text(
              'Points: 100',
              style: TextStyle(
              fontSize: 18,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Badges:',
              style: TextStyle(
              fontSize: 18,
              ),
            ),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Column(
                children: [
                  Row(
                  children: [
                    Icon(Icons.fireplace_sharp),
                    SizedBox(width: 8),
                    Text('Never Late Badge'),
                  ],
                  ),
                  SizedBox(height: 8),
                  Row(
                  children: [
                    Icon(Icons.badge),
                    SizedBox(width: 8),
                    Text('Achievement Badge'),
                  ],
                  ),
                  SizedBox(height: 8),
                  Row(
                  children: [
                    Icon(Icons.adf_scanner),
                    SizedBox(width: 8),
                    Text('Scanner Badge'),
                  ],
                  ),
                ],
                ),
              // Add more Icon widgets for additional badges
              ],
            ),
            ],
          // ],
        ),
      ),
    );
  }
}
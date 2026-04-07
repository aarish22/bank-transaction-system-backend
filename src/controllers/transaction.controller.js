/**   
 * - Create a new transaction
 * The 10 step flow for creating a new transaction is as follows:
 * 1. Validate the request body to ensure that all required fields are present and correctly formatted.
 * 2. Check if the fromAccount and toAccount exist in the database.
 * 3. Ensure that the fromAccount has sufficient balance to cover the transaction amount.
 * 4. Create a new transaction document in the database with the status set to "PENDING".
 * 5. Create two ledger entries: one for the debit from the fromAccount and one for the credit to the toAccount.
 * 6. Update the balances of the fromAccount and toAccount accordingly.
 * 7. If all operations are successful, update the transaction status to "COMPLETED". 
 *   If any operation fails, update the transaction status to "FAILED" and roll back any changes made to the accounts and ledger entries.
 * 8. Return a response to the client indicating the success or failure of the transaction creation.
 * 9. Implement error handling to manage any exceptions that may occur during the transaction creation process.
 * 10. Ensure that the entire transaction creation process is atomic to maintain data integrity.
 */

async function createTransaction(req, res) {
  const {fromAccount, toAccount, Amount, idempotencyKey} = req.body

}